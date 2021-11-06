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
  Clientes: {
    base: () => "clientes",
    CadCliente: () => { return AppRoutes.Clientes.base() + "/cad-cliente" }    
  },
  Produtos: {
    base: () => "produtos",
    CadProduto: () => { return AppRoutes.Produtos.base() + "/cad-produto" }    
  },
};