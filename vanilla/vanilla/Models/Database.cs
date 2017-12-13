using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Vanilla.Models
{
    public class Database:IDatabase<Training>
    {
        int nextId = 1;
        Dictionary<int, Training> trainings = new Dictionary<int, Training>();

        public Database()
        {
            Add(new Training("Bob", 2017, 12, 11));
            Add(new Training("Cat", 2017, 12, 11));
            Add(new Training("Dog", 2017, 12, 20));
            Add(new Training("Egg", 2017, 12, 18));
        }

        public Training Add(Training training)
        {
            training.Id = nextId++;
            trainings[training.Id] = training;
            return training;
        }

        public bool Delete(int id)
        {
            return trainings.Remove(id);
        }

        public IEnumerable<Training> Get()
        {
            return trainings.Values;
        }

        public bool TryGet(int id, out Training training)
        {
            return trainings.TryGetValue(id, out training);
        }

        public bool Update(Training training)
        {
            bool update = trainings.ContainsKey(training.Id);
            trainings[training.Id] = training;
            return update;
        }
    }
}
