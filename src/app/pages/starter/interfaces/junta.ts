import { Delegado } from "../../incripcion/interfaces/delegado";

export interface Junta {
codigo:number;
codJunta:string;
codProvincia:number;
provincia:string;
codCanton:number;
canton:string;
codParroquia:number;
parroquia:string;
codZona:number;
zona:string;
codRecinto:number;
recinto:string;
junta:string;
electores:number;
sufragantes:number;
blancos:number;
nulos:number;
si:number;
no:number;
estDelegado:string;
obsDelegado:string;
obsVotacion:string;
imagen:string;
delegados?:Delegado[]|null;
mostrarDelegados?:boolean;
voluntario:string;
estVotacion:string;
instaloJrv:string;
estaManana:string;
estaTarde:string;
usrActualiza:string;
nombre?:string;
celular?:string;
anexos?:number;
}
