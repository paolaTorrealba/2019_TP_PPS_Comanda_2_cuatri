import { Component, OnInit } from '@angular/core';
import { PollService } from 'src/app/services/poll.service';
import { CameraService } from 'src/app/services/camera.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/classes/user';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { NotificationService } from 'src/app/services/notification.service';
import { PollClient } from 'src/app/classes/pollClient';

@Component({
  selector: 'app-poll-empleoyee',
  templateUrl: './poll-empleoyee.page.html',
  styleUrls: ['./poll-empleoyee.page.scss'],
})
export class PollEmpleoyeePage implements OnInit {
  private currentUser: User;
  private pollClient:PollClient;
  public image: string;
  public  date: any;
  public answer1Model: string="mujer";
  public answer2Model: string="Internet";
  public answer3Model: string="Muy Buena";
  public answer4Model: string="si";
  public answer5Model: string="Calidad";
  public answer6Model: string="buena";
  public commentaryModel:string= "";

  public email: string ="";
  public name:string="";

  private opinion=3;
   
  constructor(private cameraService: CameraService, 
              private pollService: PollService,
              private notificationService: NotificationService,
              private authService: AuthService,
              private userService: UserService,
              private router: Router ) {    
      
      this.pollClient = new PollClient();
      console.log("poll", this.pollClient)
      this.getUsers();
      // this.obtenerEncuestas();        
      // this.encuestaExiste();    
   } 

  ngOnInit() {}

  getUsers(){
    let user = this.authService.getCurrentUser();
    if (isNullOrUndefined(user)) {
      this.router.navigateByUrl("/login");
    }
    this.userService.getUserById(user.uid).then(userData => {
      this.currentUser = Object.assign(new User, userData.data());
    })
   }

   showAlert() {
     Swal.fire({
        title: 'Custom width, padding, background.',
        width: 600,
        padding: '3em',
        backdrop: false
     })
    } 

   

savePoll(){ 
    
    if(this.currentUser.profile == "cliente"){   
      this.pollClient.email= this.currentUser.email    
    }
    //es anonimo, no guardo el correo  
    this.pollClient.name= this.currentUser.name,
    this.pollClient.date=new Date(); 
    this.pollClient.answer1=this.answer1Model,        
    this.pollClient.answer2=this.answer2Model,        
    this.pollClient.answer3=this.answer3Model,       
    this.pollClient.answer4=this.answer4Model,        
    this.pollClient.answer5=this.answer5Model,       
    this.pollClient.answer6=this.answer6Model,
    this.pollClient.commentary= this.commentaryModel

    this.pollService.savePollClient(this.pollClient).then(() => {
        this.notificationService.presentToast("Encuesta creada", "success", "top");
        this.router.navigateByUrl('/home');
      });
  
  }



  takePhoto(){    
    this.cameraService.takePhoto('encuestas', Date.now());
  }

  
  modificarTextoRange() {
    let arrayAux = ['muy mala','mala','buena','muy buena','excelente'];
    this.answer6Model= arrayAux[this.opinion - 1];
   
  }
  
}
