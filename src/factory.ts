import { log } from "@graphprotocol/graph-ts";
import { LBPairCreated as LBPairCreatedV21 } from "../generated/LBFactoryV21/LBFactoryV21";
import { LBPairV21 } from "../generated/schema";
import { loadToken } from "./entities";

export function handleLBPairCreatedV21(event: LBPairCreatedV21): void {

  log.debug("[LBPairCreated] tokenX: {}, tokenY: {}, lbpair: {}", [event.params.tokenX.toHexString(), event.params.tokenY.toHexString(), event.params.LBPair.toHexString()]);

  const lbPair = new LBPairV21(event.params.LBPair.toHexString());
  const tokenX = loadToken(event.params.tokenX);
  const tokenY = loadToken(event.params.tokenY);

  lbPair.tokenX = tokenX.id;
  lbPair.tokenY = tokenY.id;
  lbPair.binStep = event.params.binStep;

  lbPair.save();
}