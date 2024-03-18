using System;
using System.Collections.Generic;
using System.Text;

namespace LMS.Application.Service.Borrow
{
    public interface IBorrowService
    {

        string borrowSel(String Json);

        string borrowTsk(String Json);

        string borrowTransactionSel(String Json);
    }
}
