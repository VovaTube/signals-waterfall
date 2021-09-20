export  class MenuItem{
  public type:string; 
  public propertyname:string;
  public propertyvalue:string|boolean;
  public propertyoptions:any;
   
  constructor(Type:string, propertyName:string, propertyValue:string| boolean, propertyOptions:any ){
  this.type = Type;
  this.propertyname = propertyName;
  this.propertyvalue = propertyValue;
  this.propertyoptions = propertyOptions;

  }
}