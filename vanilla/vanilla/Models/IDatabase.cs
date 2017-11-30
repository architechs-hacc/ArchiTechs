using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Vanilla.Models
{
    interface IDatabase
    {
        IEnumerable<Training> Get();
        bool TryGet(int id, out Training training);
        Training Add(Training training);
        bool Delete(int id);
        bool Update(Training training);
    }
}
