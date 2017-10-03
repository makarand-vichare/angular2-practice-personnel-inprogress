import { BaseVM } from '../../Common/ViewModels/BaseVM';
export class StarShipVM extends BaseVM {
    model: string;
    crew: number;
    passengers: number;
    cargo_capacity: number;
    consumables: string;
    MGLT: string;
    hyperdrive_rating: string;
    max_atmosphering_speed: string;
    starship_class: string;
}
