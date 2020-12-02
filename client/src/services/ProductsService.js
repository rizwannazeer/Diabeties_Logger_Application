const { default: GenericService } = require("./GenericService");

class ProductsService extends GenericService{

    constructor(){
        super();
    }


    addRecord=(data)=>this.post("records",data);
    deleteRecord=(_id)=>this.delete("records/" +_id);
    updateRecord=(_id,data)=>this.put("records/"+_id,data);
    getRecord=()=>this.get("records");
    getSingleRecord=(id)=>this.get("records/"+id);


}

let productService=new ProductsService();
export default productService;