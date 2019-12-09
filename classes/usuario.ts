export class Usuario {
   public id: string;
   public nombre: string;
   public sala: number;

   constructor(id: string){
      this.id = id;
      this.nombre = 'GENERICO';
      this.sala = 1;
   }
}