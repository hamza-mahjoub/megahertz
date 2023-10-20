import 'reflect-metadata';
import _ from 'lodash';
import { inject, injectable } from 'tsyringe';
import CarRentalReadRepositoryInterface from 'src/core/domain/carRental/interfaces/repositories/read';
import CarRental from 'src/core/domain/carRental/model';
import UnitOfWork from '../common/unitOfWork';
import Car from 'src/core/domain/car/model';
import InMemoryCarRental from './carRental.entity';
import CarModel from 'src/core/domain/carModel/model';
import InMemoryCarModel from '../carModel/carModel.entity';

@injectable()
export default class InMemoryCarRentalReadRepository implements CarRentalReadRepositoryInterface {
    private readonly unitOfWork: UnitOfWork;

    constructor(@inject('UnitOfWork') unitOfWork: UnitOfWork) {
        this.unitOfWork = unitOfWork;
    }

    async read(id: string): Promise<CarRental> {

        /**
         *  Retrieving a car rental using find
         */
        // const retrievedCarRental: InMemoryCarRental | undefined = this.unitOfWork.carRentals.find((c) => c.id === id);

        /**
         *  Retrieving a car rental using lodash
         */
        const retrievedCarRental: InMemoryCarRental | undefined = _.find(
            this.unitOfWork.carRentals,
            (carRental: InMemoryCarRental) => carRental.id === id,
        );

        if (retrievedCarRental === undefined) {
            throw Error();
        }

        /**
         *  Retrieving a car model using find
         */
        // const retrievedCarModel: InMemoryCarModel | undefined = this.unitOfWork.carModels.find(
        //     (m) => m.id === retrievedCarRental.modelId,
        // );

        /**
         *  Retrieving a car model using lodash
         */
        const retrievedCarModel: InMemoryCarModel | undefined = _.find(
            this.unitOfWork.carModels,
            (carModel: InMemoryCarModel) => carModel.id === retrievedCarRental.modelId,
        );
        
        if (retrievedCarModel === undefined) {
            throw Error();
        }

        return new CarRental({
            id,
            car: new Car({
                id: retrievedCarRental.carId,
                model: new CarModel({
                    id: retrievedCarRental.modelId,
                    dailyRate: retrievedCarModel.dailyRate,
                }),
            }),
            customerId: retrievedCarRental.customerId,
            totalPrice: retrievedCarRental.totalPrice,
            pickupDateTime: retrievedCarRental.pickupDateTime,
            dropOffDateTime: retrievedCarRental.dropOffDateTime,
        });
    }
}
