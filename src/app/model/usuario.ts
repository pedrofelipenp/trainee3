const estadoCivil = ['Solteiro', 'Casado', 'Outros', 'Vazio'] as const;
type estadosCivis = typeof estadoCivil[number];
export interface Usuario {
  primeiroNomeUsuario: string;
  sobrenomeUsuario: string;
  email: string;
  senha: string;
  estadoCivilUsuario: estadosCivis;
  maiorDeIdade: boolean;
  dataAdmissao: string;
  enderecoUsuario: {
    cidadeUsuario: string;
    ruaUsuario: string;
    cepUsuario: string;
  }
}