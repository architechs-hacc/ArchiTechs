using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class Training
    {
        public Training() { }

        public Training(string name, int year, int month, int day)
        {
            Name = name;
            Year = year;
            Month = month;
            Day = day;
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public int Year { get; set; }

        public int Month { get; set; }

        public int Day { get; set; }
    }
}
