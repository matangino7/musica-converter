import { Component, OnInit } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css'],
})
export class PaypalComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;

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
        console.log(
          'Transaction approved but not authorized yet. Transaction details:',
          data
        );
        actions.order.get().then((details: any) => {
          console.log('Full order details:', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('Transaction completed and authorized:', data);
      },
      onCancel: (data, actions) => {
        console.log('Transaction canceled:', data);
      },
      onError: (err) => {
        console.error('PayPal error:', err);
      },
      onClick: (data, actions) => {
        console.log('PayPal button clicked');
      },
    };
  }
}

