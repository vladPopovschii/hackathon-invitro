import { Injectable, Search } from '@nestjs/common';
import axios from 'axios';

const baseUrl = 'https://demo.docdream.com:8001/api';

const getFullPath = (path: string) => `${baseUrl}${path}`;

@Injectable()
export class InvitroService {
  getDoctors() {
    const result = axios.get(getFullPath(''));
  }

  getRoutines(search: string) {
    const result = axios.get(getFullPath('/routines'), { params: { search } });
  }

  async getHistory(personId: number) {
    const result = await axios.get(getFullPath('appointments'), {
      params: { personId },
    });

    return result.data;
  }
}
