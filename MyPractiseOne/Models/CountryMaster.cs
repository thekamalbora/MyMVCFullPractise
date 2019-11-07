using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyPractiseOne.Models
{
    public class CountryMaster
    {
        public int CountryID { get; set; }
        public string CountryCode { get; set; }
        public string CountryName { get; set; }
        public Byte IsActive { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedDate { get; set; }
    }
}