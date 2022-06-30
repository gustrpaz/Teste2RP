using System;
using System.Collections.Generic;

#nullable disable

namespace TESTE2RP_API.Domains
{
    public partial class UserName
    {
        public int IdUser { get; set; }
        public int? IdUserType { get; set; }
        public string UserName1 { get; set; }
        public string Email { get; set; }
        public string Passwd { get; set; }
        public bool Status { get; set; }

        public virtual UserType IdUserTypeNavigation { get; set; }
    }
}
