using HoHDashboard.server.Models;
using HoHDashboard.server.Repository.IRepository;
using Microsoft.OpenApi.Any;

namespace HoHDashboard.server.Repository
{
    public class CommonTypeRepository(ApplicationDbContext context) : ICommonTypeRepository
    {
        private readonly ApplicationDbContext _context = context;
        public IEnumerable<UserLogin> GetUserList()
        {
            var list = _context.UserLogins.ToList();
            return list;
        }
        public IEnumerable<BeneficiaryMaster> GetBeneficiaryList()
        {
            var list = _context.BeneficiaryMasters.OrderBy(x => x.BeneficiaryName).Where(x => x.IsDeleted == false).ToList();
            return list;
        }
    }
}