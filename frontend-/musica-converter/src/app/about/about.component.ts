import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  teamMembers = [
    {
      name: 'John Doe',
      role: 'Founder & CEO',
      bio: 'Passionate about music and technology, John founded MusicaConvio to help music lovers seamlessly transfer their playlists between platforms.',
      image: 'assets/images/team/john.jpg'
    },
    {
      name: 'Jane Smith',
      role: 'Lead Developer',
      bio: 'With over 10 years of experience in software development, Jane leads our technical team in creating robust and user-friendly solutions.',
      image: 'assets/images/team/jane.jpg'
    },
    {
      name: 'Mike Johnson',
      role: 'Music Integration Specialist',
      bio: 'Mike brings his expertise in music streaming platforms to ensure perfect playlist transfers between different services.',
      image: 'assets/images/team/mike.jpg'
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}
