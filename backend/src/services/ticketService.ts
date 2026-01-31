import { TicketRepository } from '../repositories/ticketRepository';
import { CreateTicketInput, UpdateTicketInput, QueryTicketsInput } from '../validators/schemas';

export class TicketService {
  private ticketRepo: TicketRepository;

  constructor() {
    this.ticketRepo = new TicketRepository();
  }

  async createTicket(data: CreateTicketInput) {
    return this.ticketRepo.create(data);
  }

  async getTicketById(id: string) {
    const ticket = await this.ticketRepo.findById(id);
    if (!ticket) {
      throw new Error('Ticket not found');
    }
    return ticket;
  }

  async getAllTickets(query: QueryTicketsInput) {
    return this.ticketRepo.findAll(query);
  }

  async updateTicket(id: string, data: UpdateTicketInput) {
    const exists = await this.ticketRepo.exists(id);
    if (!exists) {
      throw new Error('Ticket not found');
    }
    return this.ticketRepo.update(id, data);
  }

  async deleteTicket(id: string) {
    const exists = await this.ticketRepo.exists(id);
    if (!exists) {
      throw new Error('Ticket not found');
    }
    return this.ticketRepo.delete(id);
  }
}
