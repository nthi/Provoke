using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Provoke.Models
{
    public class User
    {
        public int id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }

        [Required]
        public string userName { get; set; }

        [DataType(DataType.EmailAddress)]
        public string email { get; set; }

        [Required]
        public bool normalMode { get; set; }

    }
}
