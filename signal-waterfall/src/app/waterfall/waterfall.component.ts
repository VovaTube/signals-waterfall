import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { LableOpions, Marker, MarkerOptions } from '../models/Markers';

@Component({
  selector: 'app-waterfall',
  templateUrl: './waterfall.component.html',
  styleUrls: ['./waterfall.component.scss']
})
export class WaterfallComponent implements AfterViewInit {

  @Input() Id:string = '';

  id: string = 'waterfall';
  canvas: HTMLCanvasElement;
  ctx: any;
  fftsize: number = 20;
  higthWaterfall = 400-20;
  possittionY: number = 180;
  imgData: any;
  generatedbuffer = new Array(this.fftsize);
  waterfallbuffer: number[] = [];
  waterfallbufferone = new Array(this.fftsize * 4);
  line = this.fftsize * 4;
  signal = false;
  datargb = new Array(this.fftsize * 4);
  public red: number = 12;
  public green: number = 16;
  public blue: number = 0;
  markrs: Marker[] = [];
  dragflag = false;
  idDrag: number;
  additionalToolsTopHigth=50; 
  additionalToolsBottomHigth=20; 
  showMarkerFlag=true;
  timedelay:number = 50;
  constructor() {}

  ngAfterViewInit(): void {
    this.initCanvasData();
    this.genereteTestMarkers();
    this.startReceive();
  }

  initCanvasData(){
    this.canvas =   document.getElementById(this.id) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');
    this.fftsize = window.innerWidth;;
    this.waterfallbufferone = new  Array(this.fftsize * 4);
    this.datargb = new Array(this.fftsize * 4);
    this.generatedbuffer = new Array(this.fftsize);
    this.line = this.fftsize*4;
    this.canvas.width = window.innerWidth;
    this.canvas.height = 400;
    this.waterfallbuffer.length=innerWidth;
    this.higthWaterfall = this.canvas.height-this.additionalToolsBottomHigth-this.additionalToolsTopHigth;
    this.addLisiners();
    this.imgData = this.ctx.createImageData(this.fftsize, this.higthWaterfall);
  }

  addLisiners(){
    this.canvas.addEventListener('mousedown', (event) => {
      this.findElementAndDoSomething(event);
    });
  
    this.canvas.addEventListener('wheel', (event) => {
      this.changeSignalWidth(event);
    });
    this.canvas.addEventListener('mousedown', (event) => {
      this.dragMarkerStart(event);
    });
    this.canvas.addEventListener('mousemove', (event) => {
      this.dragMarker(event);
    });
    this.canvas.addEventListener('mouseup', (event) => {
      this.dragMarkerEnd(event);
    });
    this.canvas.addEventListener('mouseup', (event) => {
      this.dragMarkerEnd(event);
    });
    document.addEventListener("dragover", function(event) {
      // prevent default to allow drop
      event.preventDefault();
    }, false);
  }

  //функція генерування сигналу

  generateTestSignal(size: number) {
    var buffer = [];
    for (let index = 0; index < size; index++) {
      if (index > 100 && index < 200) {
        buffer[index] = this.getRandomNumber(35, 50);
      }
      else if (index > 680 && index < 920 ) {
        buffer[index] = this.getRandomNumber(35, 50);
      } 
      else if (index > 1200 && index < 1300 ) {
        buffer[index] = this.getRandomNumber(50, 90);
      } 
      else if (index > 250 && index < 300) {
        buffer[index] = this.getRandomNumber(65, 80);
      } else if (index > 380 && index < 420 && this.signal) {
        buffer[index] = this.getRandomNumber(35, 50);
        
      } else {
        buffer[index] = buffer[index] = this.getRandomNumber(190, 200);
      }
    }
    this.generatedbuffer = buffer;

    return buffer;
  }

  public getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  private drawTestSignal(
    startX: number,
    startY: number,
    context: CanvasRenderingContext2D,
    buffer: any
  ) {
    context.beginPath();

    var count = 0;
    for (let index = 0; index < buffer.length; index++) {
      context.lineTo(count, buffer[index] + this.possittionY);
      count += 1;
    }
    context.stroke();
    //заливка водопада
    //   context.lineTo(this.canvas.width, 400);
    //   context.lineTo(0, context.canvas.height);
    //   context.fillStyle= 'rgba(237, 245, 20,0.8)';
    //  // context.globalCompositeOperation = "destination-over";
    //   context.fill();
    context.closePath();
  }

  private drawOnCanvas(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    let data = this.generateTestSignal(this.fftsize);
    //водопад
    this.prepareDateForWaterfall(data);
    for (let index = 0; index < this.waterfallbuffer.length; index++) {
      this.imgData.data[index] = this.waterfallbuffer[index];
    }
    this.ctx.putImageData(this.imgData, 0, this.additionalToolsTopHigth);
    //сам сигнал
    if (this.showMarkerFlag) this.drowMarker();
    this.drawTestSignal(200, this.canvas.width / 2, this.ctx, data);
    //маркери
     
    
  }

  startReceive() {
    
      //window.requestAnimationFrame(this.drawOnCanvas.bind(this));
    
 
   
    setInterval(this.drawOnCanvas.bind(this), this.timedelay);
  }

  private prepareDateForWaterfall(bufferwaterfall: any) {
    let count = 0;
    for (let i = 0; i < this.waterfallbufferone.length; i += 4) {
      this.datargb[i + 0] = bufferwaterfall[count] + this.red;
      this.datargb[i + 1] = bufferwaterfall[count] + this.green;
      this.datargb[i + 2] = bufferwaterfall[count] + this.blue;
      this.datargb[i + 3] = 200;
      count+=1;
    }
    this.waterfallbuffer = this.datargb.concat(this.waterfallbuffer);
    if (this.waterfallbuffer.length > this.fftsize * this.higthWaterfall * 4) {
      this.waterfallbuffer.splice(this.waterfallbuffer.length - this.line,this.line);
      //console.log( this.waterfallbuffer)
    }
  }
  chekboxChange() {
    this.signal = !this.signal;
  }

  rangeGreenRed(tardetvalu: number) {
    this.red = Number(tardetvalu);
  }

  rangeGreenChange(tardetvalu: number) {
    this.green = Number(tardetvalu);
  }
  rangeGreenBlue(tardetvalu: number) {
    this.blue = Number(tardetvalu);
  }

  drowMarker() {
    this.markrs.forEach((el) => {
      el.draw(this.ctx, el.options, el.labelOptions);
    });
  }

  genereteTestMarkers() {
    for (let index = 1; index <= 5; index++) {
      const element = new Marker();
      if (index % 2 == 0) {
        var markOptions = new MarkerOptions(
          index * 200,
          10*index,
          'rgba(237, 242, 138,0.5)',
          'black',
          this.additionalToolsTopHigth,
        );
      } else {
        var markOptions = new MarkerOptions(
          index * 200,
          150,
          'rgba(135, 255, 187,0.5)',
          'black',
          this.additionalToolsTopHigth
        );
      }
      let label = new LableOpions(
        50,
        20,
        'top',
        'rgba(50, 209, 116,0.8)',
        5,
        16,
        'bla',
        'red',
        0
      );
      element.id = 'id' + '-' + index;
      element.label = true;
      element.options = markOptions;
      element.labelOptions = label;
      element.type = 'box';
      this.markrs.push(element);
    }
  }

  findElementAndDoSomething(event: MouseEvent) {
    const x = this.markrs.findIndex(
      (el) =>
        event.offsetX >
          el.options.centerMarkerPossition - el.options.matkerWidth / 2 &&
        event.offsetX <
          el.options.centerMarkerPossition + el.options.matkerWidth / 2
    );
    if (x != -1) {
      if (event.ctrlKey) {
        this.markrs[x].options.matkerWidth += 5;
      }
    }
  }

  changeSignalWidth(event: WheelEvent) {
    event.preventDefault();
    const x = this.markrs.findIndex(
      (el) =>
        event.offsetX >
          el.options.centerMarkerPossition - el.options.matkerWidth / 2 &&
        event.offsetX <
          el.options.centerMarkerPossition + el.options.matkerWidth / 2
    );
    if (x != -1&&this.showMarkerFlag) {
      // alert(this.markrs[x].id)
      if (event.ctrlKey && this.markrs[x].options.matkerWidth>=20) {
        this.markrs[x].options.matkerWidth -= event.deltaY / 20;
        this.updatecanvas();
      }
    }
    else{
      
    }
  }

  dragMarkerStart(event: any) {
    this.dragflag = true;
    let dragableindex = this.markrs.findIndex(
      (el) =>
        event.offsetY >this.additionalToolsTopHigth &&
        event.offsetX >
          el.options.centerMarkerPossition - el.options.matkerWidth / 2 &&
        event.offsetX <
          el.options.centerMarkerPossition + el.options.matkerWidth / 2
    );
    if (dragableindex != -1) {
      this.idDrag = dragableindex;
      this.dragflag = true;
    }
    else{
      this.dragflag = false;
    }
  }

  dragMarker(event: any) {
    event.preventDefault();

    if (this.dragflag) {
      this.markrs[this.idDrag].options.centerMarkerPossition = event.offsetX;
      this.updatecanvas()
    }
    else {
      let hoverind = this.markrs.findIndex(
        (el) =>
        event.offsetY >this.additionalToolsTopHigth &&
          event.offsetX >
            el.options.centerMarkerPossition - el.options.matkerWidth / 2 &&
          event.offsetX <
            el.options.centerMarkerPossition + el.options.matkerWidth / 2 
      );
      if (hoverind != -1) {
        this.markrs[hoverind].labelOptions.backgroundcolor = 'rgba(73, 78, 242, 0.5)';
        this.updatecanvas();
      }
      else{
        this.markrs.forEach((el)=>{el.labelOptions.backgroundcolor='rgba(50, 209, 116,0.8)'})
        this.updatecanvas();
      }
    } 
  }

  dragMarkerEnd(event: any) {
    this.dragflag = false;
  
  }
  updatecanvas(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //let data = this.generateTestSignal(this.fftsize);
    //водопад
    this.ctx.putImageData(this.imgData, 0, this.additionalToolsTopHigth);
    //сам сигнал
    if (this.showMarkerFlag) this.drowMarker();
    this.drawTestSignal(200, this.canvas.width / 2, this.ctx, this.generatedbuffer);
  }


}
