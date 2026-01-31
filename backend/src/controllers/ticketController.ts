import { Request, Response, NextFunction } from 'express';
import { TicketService } from '../services/ticketService';
import {
  createTicketSchema,
  updateTicketSchema,
  queryTicketsSchema,
} from '../validators/schemas';

export class TicketController {
  private ticketService: TicketService;

  constructor() {
    this.ticketService = new TicketService();
  }

  createTicket = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = createTicketSchema.parse(req.body);
      const ticket = await this.ticketService.createTicket(validatedData);
      res.status(201).json({
        success: true,
        data: ticket,
      });
    } catch (error) {
      next(error);
    }
  };

  getTickets = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedQuery = queryTicketsSchema.parse(req.query);
      const result = await this.ticketService.getAllTickets(validatedQuery);
      res.json({
        success: true,
        data: result.tickets,
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  };

  getTicketById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const ticket = await this.ticketService.getTicketById(id);
      res.json({
        success: true,
        data: ticket,
      });
    } catch (error) {
      next(error);
    }
  };

  updateTicket = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const validatedData = updateTicketSchema.parse(req.body);
      const ticket = await this.ticketService.updateTicket(id, validatedData);
      res.json({
        success: true,
        data: ticket,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteTicket = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.ticketService.deleteTicket(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
