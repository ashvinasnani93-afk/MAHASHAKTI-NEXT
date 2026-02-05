import { Module } from '@nestjs/common';
import { AngelOneService } from './angel-one.service';
import { SymbolMasterService } from './symbol-master.service';
import { WebSocketStreamService } from './websocket-stream.service';

@Module({
  providers: [AngelOneService, SymbolMasterService, WebSocketStreamService],
  exports: [AngelOneService, SymbolMasterService, WebSocketStreamService],
})
export class AngelOneModule {}
