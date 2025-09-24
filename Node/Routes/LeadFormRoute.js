import express from 'express';
import LeadFormCtrl from '../Controllers/LeadFormCtrl.js';

const leadFormRoute = express.Router();

leadFormRoute.post('/api/lead-form', LeadFormCtrl.leadForm);
leadFormRoute.get('/api/lead-lists', LeadFormCtrl.leadLists);
leadFormRoute.get('/api/total-leads', LeadFormCtrl.totalLeads);

export default leadFormRoute;


