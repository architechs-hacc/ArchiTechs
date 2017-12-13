using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Vanilla.Models
{
    public interface IDatabase<T>
    {
        IEnumerable<T> Get();
        bool TryGet(int id, out T element);
        T Add(T element);
        bool Delete(int id);
        bool Update(T element);
    }
}
