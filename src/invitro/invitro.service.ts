import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as https from 'https';
import { SignUpDto } from '../core/dto/auth.dto';
import { CreateAppointment } from './dto/appointment';

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

const baseUrl = 'https://demo.docdream.com:8001/api';

const getFullPath = (path: string) => `${baseUrl}${path}`;

@Injectable()
export class InvitroService {
  async getSpecialitie() {
    const result = await axios.get(getFullPath('/specialities'), {
      httpsAgent,
    });

    return result.data;
  }

  // async getDoctor(id: number) {
  //   const result = await axios.get(getFullPath('/executors'), {
  //     params: { specialityId },
  //     httpsAgent,
  //   });

  //   return result.data;
  // }

  async getDoctors(specialityId: number) {
    const result = await axios.get(getFullPath('/executors'), {
      params: { specialityId },
      httpsAgent,
    });

    return result.data;
  }

  async getDoctorRoutines(doctorId: number): Promise<[{ routineId: number }]> {
    console.log(doctorId);

    const result = await axios.get(
      getFullPath(`/executors/${doctorId}/abilities`),
      {
        httpsAgent,
      },
    );

    return result.data;
  }

  async getRoutines(routineId: number) {
    const doctorRoutines = await this.getDoctorRoutines(routineId);

    const { data } = await axios.get(getFullPath(`/routines/${routineId}`), {
      httpsAgent,
    });

    return data.filter((routine) =>
      doctorRoutines.some(
        (doctorRoutine) => doctorRoutine.routineId === routine.id,
      ),
    );
  }

  async getRoutineById(routineId: number) {
    const { data } = await axios.get(getFullPath(`/routines/${routineId}`), {
      httpsAgent,
    });

    return data;
  }

  async getAppointments(patientId: number) {
    const result = await axios.get(getFullPath('/appointments'), {
      params: { patientId },
      httpsAgent,
    });

    return result.data;
  }

  async getAppointmentById(id: number) {
    const result = await axios.get(getFullPath(`/appointments/${id}`), {
      httpsAgent,
    });

    return result.data;
  }

  async createAppointments(data: CreateAppointment) {
    console.log(data);
    const result = await axios.post(getFullPath('/appointments'), data, {
      httpsAgent,
    });

    return result.data;
  }

  async createUser(signUpDto: SignUpDto): Promise<{ id: number }> {
    const result = await axios.post(getFullPath('/persons'), signUpDto, {
      httpsAgent,
    });

    return result.data;
  }
}
