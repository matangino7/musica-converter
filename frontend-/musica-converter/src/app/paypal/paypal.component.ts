import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css'],
})
export class PaypalComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;
  @Output() onClientAuthorization = new EventEmitter<any>();
  @Output() onApprove = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<any>();
  @Output() onError = new EventEmitter<any>();
  @Output() onClick = new EventEmitter<any>();

  ngOnInit(): void {
    this.initConfig();
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'AQwjnWh6f-CR-jrizSwypks-jsMCe6ZhGBY5_LbRPbeduSJOV9DnPYU3yPxcnToGh1Q9Vka-5bJLUv3V', // Replace with your PayPal client ID
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: '2', // Set the amount to be charged
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: '2',
                },
              },
            },
            items: [
              {
                name: 'Playlist Conversion',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'USD',
                  value: '2',
                },
              },
            ],
          },
        ],
      },
      advanced: {
        commit: 'true', // Automatically capture the funds on payment
      },
      style: {
        label: 'paypal', // Label on the PayPal button (e.g., "paypal", "checkout")
        layout: 'vertical', // Layout options: "vertical" | "horizontal"
      },
      onApprove: (data, actions) => {
        actions.order.get().then((details: any) => {
          this.onApprove.emit([data, details]);
        });
      },
      onClientAuthorization: (data) => {
        this.onClientAuthorization.emit(data);
      },
      onCancel: (data, actions) => {
        this.onCancel.emit(data);
      },
      onError: (err) => {
        this.onError.emit(err);
      },
      onClick: (data, actions) => {
        this.onError.emit(data);
      },
    };
  }
}

