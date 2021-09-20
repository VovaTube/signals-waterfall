
export class Marker{
    label:boolean;
    type:string;
    id:string;
    options:MarkerOptions;
    labelOptions:LableOpions;
    draw(ctx:any, options:MarkerOptions, optionsLabel:LableOpions )
    {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle=options.markerLineColor;
        ctx.moveTo(options.centerMarkerPossition, options.vertivalstart);
        ctx.lineTo(options.centerMarkerPossition,  ctx.canvas.height);
        ctx.fillStyle=options.markerBoxColor;
        ctx.fillRect(options.centerMarkerPossition - options.matkerWidth/2, options.vertivalstart, options.matkerWidth,  ctx.canvas.height);
        ctx.stroke();
        if (this.label) {
                const  xs = options.centerMarkerPossition - options.matkerWidth/2;
                const  ys = 1;
            if (optionsLabel.possitiontype==="top") {
                ctx.fillStyle=optionsLabel.backgroundcolor;
                if (options.matkerWidth < 2 * optionsLabel.radius) optionsLabel.radius = options.matkerWidth / 2;
                if (optionsLabel.height < 2 * optionsLabel.radius) optionsLabel.radius = optionsLabel.height / 2;
                ctx.beginPath();
                const xsl = options.centerMarkerPossition - optionsLabel.width/2;
                const ysl = options.vertivalstart;
                ctx.moveTo(xsl + optionsLabel.radius, ysl);
                ctx.arcTo(xsl + optionsLabel.width, ysl, xsl + optionsLabel.width, ysl + optionsLabel.height, optionsLabel.radius);
                ctx.arcTo(xsl + optionsLabel.width, ysl + optionsLabel.height, xsl, ysl + optionsLabel.height, optionsLabel.radius);
                ctx.arcTo(xsl, ysl + optionsLabel.height, xsl, ysl, optionsLabel.radius);
                ctx.arcTo(xsl, ysl, xsl + optionsLabel.height, ysl, optionsLabel.radius);
                ctx.fill();
                ctx.fillStyle = optionsLabel.textcolor;
                ctx.font = optionsLabel.textsize+'px serif';
                ctx.textAlign = 'center';
                ctx.fillText(options.centerMarkerPossition.toString(), options.centerMarkerPossition, ysl+optionsLabel.height-4);
                ctx.closePath();
            }
            else if (optionsLabel.possitiontype==="center") {
                ctx.fillStyle=optionsLabel.backgroundcolor;
                ctx.fillRect(xs, 1, optionsLabel.width, optionsLabel.height);
            }
            else if (optionsLabel.possitiontype==="bottom") {
                ctx.fillStyle=optionsLabel.backgroundcolor;
                ctx.fillRect(xs, 1, optionsLabel.width, optionsLabel.height);
            }
        }
       // ctx.restore();

    };
    update(){};
}
export class MarkerOptions{
vertivalstart:number;
centerMarkerPossition: number;
matkerWidth: number;
markerBoxColor: string;
markerLineColor: string;

constructor(centermarkermossition:number, matkerwidth:number, markerboxcolor:string, markerlinecolor:string, vstart:number){
    this.centerMarkerPossition = centermarkermossition;
    this.matkerWidth = matkerwidth;
    this.markerBoxColor = markerboxcolor;
    this.markerLineColor = markerlinecolor;
    this.vertivalstart = vstart;
}


}
export class LableOpions{
    lablemargimtop:number;
    width:number;
    height:number;
    possitiontype:string;//center top bottom
    backgroundcolor:string;
    radius:number;
    textsize:number;
    textcolor:string;
    text:string;
    constructor(width:number, higth:number, possitiontype:string, backgraund:string, rounded:number, textSixe:number, Text:string, textColor:string,  lableMargimTop:number){
    this.width = width;
    this.height = higth;
    this.possitiontype = possitiontype;
    this.backgroundcolor = backgraund;
    this.radius = rounded;
    this.textsize = textSixe;
    this.text = Text;
    this.lablemargimtop = lableMargimTop;
    this.textcolor= textColor;
    }
}