import { Controller, Get } from '@nestjs/common';
import { DataTransferObject } from '@npl/interfaces';
import { PlotsService } from './plots.service';

@Controller('api/plots')
export class PlotsController {
  constructor(private plotsService: PlotsService) {}

  @Get()
  getPlots(): DataTransferObject {
    const dto: DataTransferObject = {
      stacks: this.plotsService.stacks$.getValue(),
      plots: this.plotsService.plots$.getValue()
    };

    return dto;
  }
}
