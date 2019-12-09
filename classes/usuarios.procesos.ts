import { Usuario } from './usuario';
export class Usuariosprocess {
   private lista: Usuario[] = [];

   constructor(){}

   agregar(usuario: Usuario){
      this.lista.push(usuario);
      return usuario;
   }

   actualizarNombre(id: string, nombre: string){
      for(let usuario of this.lista){
         if(usuario.id === id){
            usuario.nombre = nombre;
            break;
         }
      }
      console.log(this.lista);
   }

   getLista(){
      return this.lista;
   }

   getUser(id: string){
      return this.lista.find(usuario => {
         return usuario.id === id;
      });
   }

   //Obtener usuarios de una sala en particulas
   usersInRomm(sala: number){
      return this.lista.filter(usuario =>{
         return usuario.sala === sala;
      })
   }

   deleteUser(id: string){
      console.log(id);
      const auxuser = this.getUser(id);
      console.log(auxuser);
      this.lista = this.lista.filter(usuario => {
         return usuario.id !== id;
      });
      
      return auxuser;
   }

}