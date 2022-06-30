using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TESTE2RP_API.ViewModels
{
    public class LoginViewModel
    {
      
            [Required(ErrorMessage = "Email inválido")]
            public string email { get; set; }
            [Required(ErrorMessage = "Senha inválida")]
            public string password { get; set; }
  
    }
}
