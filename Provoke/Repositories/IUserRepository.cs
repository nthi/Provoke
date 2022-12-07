using Provoke.Models;

namespace Provoke.Repositories
{
    public interface IUserRepository
    {
        public User GetUserById(int id);
        public User GetByEmail(string email);
        public void AddUser(User user);
        public void UpdateUser(int id, User user);
        public void DeleteUser(int id);
    }
}