import { Router } from 'express'
const router = Router()
import msalController from '../controller/msal.controller'

router.get('/',msalController.msalLogin);
router.get('/redirect',msalController.msalRedirect);

module.exports = router;

