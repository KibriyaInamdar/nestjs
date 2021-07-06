import { HttpService, Injectable } from '@nestjs/common';
import { Neo4jService } from './neo4j/neo4j.service';

@Injectable()
export class AppService {
  constructor(
    private readonly neo4jService: Neo4jService,
    private httpService: HttpService,
  ) {}

  async getHello(): Promise<string> {
    console.log(this.neo4jService);

    const result = await this.neo4jService.read(
      `MATCH (n) RETURN count(n) AS count`,
      {},
    );

    const count = result.records[0].get('count');
    return `Hello Neo4j User! There are ${count} nodes in database`;
  }

  async getData(req: any, entity: string, params: string): Promise<string> {
    console.log(`req: ${req.url}, entity: ${entity}, params: ${params}`);
    const url = `https://sandbox.api.sap.com/${entity}${
      params ? `?${params}` : ''
    }`;
    console.log(url); //for debugging

    const headersRequest = {
      'Content-Type': 'application/json',
      apiKey: 'PhsRXkvMOZLhn1kqO2lif8aNhH76jYTd',
    };
    // const response = await fetch(url, options);
    const response = (
      await this.httpService
        .get(url, {
          headers: headersRequest,
        })
        .toPromise()
    ).data;
    // console.log(`${response..status} (${response.statusText})`); // for debugging
    // const json = await response.json();
    return response;
  }
}
