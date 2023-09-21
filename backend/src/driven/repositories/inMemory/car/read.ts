import _ from 'lodash';
import Car from '../../../../core/domain/car/model';
import UnitOfWork from '../common/unitOfWork';
import CarReadRepositoryInterface from '../../../../core/domain/car/interfaces/repositories/read';
import InMemoryCar from './car.entity';

export default class InMemoryCarReadRepository implements CarReadRepositoryInterface {
    private readonly unitOfWork: UnitOfWork;

    constructor({unitOfWork}: { unitOfWork: UnitOfWork }) {
        this.unitOfWork = unitOfWork;
    }

    async getOneAvailableCar({modelId}: { modelId: string }): Promise<Car> {
        const retrievedCar = _.find(this.unitOfWork.cars, inMemoryCar => inMemoryCar.modelId === modelId) as InMemoryCar;

        return new Car({id: retrievedCar.id});
    }
}