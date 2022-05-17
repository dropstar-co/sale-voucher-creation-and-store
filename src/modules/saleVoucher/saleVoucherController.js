import responseHandler from '../../helpers/responseHandler';
import errorHandler from '../../helpers/errorHandler';
import { SaleVoucher } from '../../database/models';

class SaleVoucherController {
  static async getSaleVouchers(req, res) {
    try {
      const allBids = await SaleVoucher.findAll({ where: { id: req.params.id } });

      return responseHandler(res, 'NFT loaded', 200, allBids);
    } catch (error) {
      errorHandler.handleError(error.message, 500, res);
    }
  }
}

export default SaleVoucherController;
