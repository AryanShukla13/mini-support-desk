import { Router } from 'express';
import { TicketController } from '../controllers/ticketController';

const router = Router();
const ticketController = new TicketController();

router.post('/', ticketController.createTicket);
router.get('/', ticketController.getTickets);
router.get('/:id', ticketController.getTicketById);
router.patch('/:id', ticketController.updateTicket);
router.delete('/:id', ticketController.deleteTicket);

export default router;
