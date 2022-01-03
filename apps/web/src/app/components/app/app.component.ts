import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'npl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(private socketService: SocketService) {}
}
