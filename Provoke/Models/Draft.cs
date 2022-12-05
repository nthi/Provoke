using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Provoke.Models
{
    public class Draft
    {
        public int id { get; set; }

        [Required]
        public int userId { get; set; }
        public string title { get; set; }
        public string content { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime dateCreated { get; set; }

        [Required]
        public bool published { get; set; }
        public int placeHolderId { get; set; }

    }
}
