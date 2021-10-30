export const AppRoutes = {
  Login: {
    base: () => "login",    
  },
  Users: {
    base: () => "usuarios",
    CadUsuario: () => { return AppRoutes.Users.base() + "/cad-usuario" },
  },
  Grupos: {
    base: () => "grupos",
    CadGrupo: () => { return AppRoutes.Grupos.base() + "/cad-grupo" }    
  },
  Produtos: {
    base: () => "produtos",
    CadGrupo: () => { return AppRoutes.Produtos.base() + "/cad-produto" }    
  },
};