import { log } from "@graphprotocol/graph-ts";
import { LBPairCreated as LBPairCreatedV21 } from "../generated/LBFactoryV21/LBFactoryV21";
import { LBPairV21 } from "../generated/schema";
import { loadToken } from "./entities";

export function handleLBPairCreatedV21(event: LBPairCreatedV21): void {

  log.info("[LBPairCreated] tokenX: {}, tokenY: {}, binStep: {}", [event.params.tokenX.toString(), event.params.tokenY.toString(), event.params.binStep.toString()]);

  const lbPair = new LBPairV21(event.params.LBPair.toHexString());

  // load token and store them
  loadToken(event.params.tokenX);
  loadToken(event.params.tokenY);

  lbPair.tokenX = event.params.tokenX.toString();
  lbPair.tokenY = event.params.tokenY.toString();
  lbPair.binStep = event.params.binStep;

  lbPair.save();
}