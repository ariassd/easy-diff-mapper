import { ChangeType } from './change-type.enum';
import { Options } from './options';
export class EasyDiffMapper {
  public async compare(originalObject: any, newObject: any, options: Options): Promise<any> {
    return this.deepDiffMapper.map(originalObject, newObject, options);
  }

  private deepDiffMapper = (function () {
    return {
      map: function (obj1: any, obj2: any, options: Options) {
        if (this.isFunction(obj1) || this.isFunction(obj2)) {
          throw 'Invalid argument. Function given, object expected.';
        }
        if (this.isValue(obj1) || this.isValue(obj2)) {
          return {
            changeType: this.compareValues(obj1, obj2),
            old: obj1,
            new: obj2,
          };
        }
        let diff: any = {};
        for (var key in obj1) {
          if (this.isFunction(obj1[key])) {
            continue;
          }
          var value2 = undefined;
          if (obj2[key] !== undefined) {
            value2 = obj2[key];
          }
          const change = this.map(obj1[key], value2, options);
          if (!options.excludeUnchanged || change.type !== ChangeType.Unchanged) {
            diff[key] = change;
          }
        }
        for (var key in obj2) {
          if (this.isFunction(obj2[key]) || diff[key] !== ChangeType.Unchanged) {
            continue;
          }
          const change = this.map(undefined, obj2[key], options);
          if (!options.excludeUnchanged || change.type !== 'unchanged') {
            diff[key] = change;
          }
        }
        return diff;
      },
      compareValues: function (value1: any, value2: any) {
        if (value1 === value2) {
          return ChangeType.Unchanged;
        }
        if (this.isDate(value1) && this.isDate(value2) && value1.getTime() === value2.getTime()) {
          return ChangeType.Unchanged;
        }
        if (value1 === undefined) {
          return ChangeType.Created;
        }
        if (value2 === undefined) {
          return ChangeType.Deleted;
        }
        return ChangeType.Updated;
      },
      isFunction: function (x: any) {
        return Object.prototype.toString.call(x) === '[object Function]';
      },
      isArray: function (x: any) {
        return Object.prototype.toString.call(x) === '[object Array]';
      },
      isDate: function (x: any) {
        return Object.prototype.toString.call(x) === '[object Date]';
      },
      isObject: function (x: any) {
        return Object.prototype.toString.call(x) === '[object Object]';
      },
      isValue: function (x: any) {
        return !this.isObject(x) && !this.isArray(x);
      },
    };
  })();
}
