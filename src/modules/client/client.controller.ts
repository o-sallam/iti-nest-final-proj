import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from './client.entity';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async create(@Body() data: Partial<Client>): Promise<Client> {
    return this.clientService.create(data);
  }

  @Get()
  async findAll(): Promise<Client[]> {
    return this.clientService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Client> {
    return this.clientService.findById(id);
  }
}

