using HoHDashboard.server.Models;
using HoHDashboard.server.ViewModels;
using Microsoft.OpenApi.Any;

namespace HoHDashboard.server.Repository.IRepository
{
    public interface ICommonTypeRepository
    {
        IEnumerable<UserLogin> GetUserList();
        IEnumerable<BeneficiaryMaster> GetBeneficiaryList();
        IEnumerable<FyYearSubsidyAmountViewModel> GetFyYearSubsidyAmount();

        string AddComponent(ComponentViewModel vmodel);
        IEnumerable<ComponentMaster> ComponentList();
    }
}
