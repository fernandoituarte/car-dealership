import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    // {
    //   id: uuid(),
    //   brand: 'Honda',
    //   model: 'Civic',
    // },
  ];

  create(createCarDto: CreateCarDto) {
    const newCar = {
      id: uuid(),
      ...createCarDto,
    };
    this.cars.push(newCar);

    return this.cars;
  }

  findAll() {
    return this.cars;
  }

  findOne(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with '${id}' not found`);
    return car;
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    let carDB = this.findOne(id);

    if (updateCarDto.id && updateCarDto.id !== id) {
      throw new BadRequestException('Car id is not valid inside body');
    }

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDB = { ...carDB, ...updateCarDto, id };
        return carDB;
      }
      return car;
    });

    return updateCarDto;
  }

  remove(id: string) {
    this.findOne(id);

    this.cars = this.cars.filter((car) => car.id !== id);
    return `Car with id: #${id} has been deleted`;
  }

  fillCarsWithSeedData(cars: Car[]) {
    this.cars = cars;
  }
}
