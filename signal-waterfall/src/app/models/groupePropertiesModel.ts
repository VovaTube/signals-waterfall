import { from } from "rxjs"
import  {MenuItem} from './menuItemModel';
export class GroupeItemsMenu {
public groupeId:string;
public groupeName:string;
public itemsGroupe: MenuItem[];
public visibility:boolean|undefined;
public colapsed:boolean|undefined;
public xycoordinate:CarrentPossitions|undefined;

    constructor(name:string, itemsgroupe:  MenuItem[], visivility?: boolean, coolapsflag?:boolean, xy?:CarrentPossitions) {
        this.groupeName=name;
        this.itemsGroupe=itemsgroupe;
        this.visibility=visivility;
        this.colapsed = coolapsflag;
        this.xycoordinate= xy;
        this.groupeId = name+"Id";



    }
}

export class CarrentPossitions {
    public offsetx:number|undefined;;
    public offsety:number|undefined;;
    
    
    constructor(x?:number, y?:number) {
       this.offsetx=x;
       this.offsety=y; 
    }
}