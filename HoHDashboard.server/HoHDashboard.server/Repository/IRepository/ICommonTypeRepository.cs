using HoHDashboard.server.Models;
using Microsoft.OpenApi.Any;

namespace HoHDashboard.server.Repository.IRepository
{
    public interface ICommonTypeRepository
    {
        IEnumerable<UserLogin> GetUserList();
        IEnumerable<BeneficiaryMaster> GetBeneficiaryList();
    }
}
