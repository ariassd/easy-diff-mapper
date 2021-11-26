![](assets/header.jpg)

# Easy Diff Mapper

### Get differences between two JSON objects

This NPM compares two JSON objects and return changes between them.

This is a great way to get a summary of changes for one object before save it on database or just to show differences in order to make a decision.

## How to install?.

```bash
# from NPM
npm i easy-diff-mapper

or

# from Github
npm i git+https://github.com/ariassd/easy-diff-mapper.git

```

### Simple use of the package

**EasyDiffMapper.compare**

```typescript
import { EasyDiffMapper } from './easy-diff-mapper';

// ...

// declare the original object
const obj1 = {
  name: 'Ed Edwards',
  address: 'St 10, Av 10, Building 1023',
  country: 'Costa Rica',
  contactData: [
    {
      type: 'email',
      description: 'personal',
      contact: 'eedwards@gmail.com',
    },
    {
      type: 'email',
      description: 'work',
      contact: 'eedwards@coolcompany.com',
    },
  ],
  pendingTasks: ['Prepare invoice payments', 'Update excel payroll information', 'Make a deposit for payroll'],
  department: {
    name: 'finances',
    offices: ['408 4th floor, finances main office', '103 1st floor, finances reception'],
  },
};

// make a copy of the original object and do some changes.
const copyObj1 = JSON.parse(JSON.stringify(obj1));
delete copyObj1.country;
copyObj1.birthday = '1990-08-21';
copyObj1.address = 'St 10, Av 33, Building 1023';
copyObj1.contactData.pop();
copyObj1.contactData.push({
  type: 'phone',
  description: 'personal',
  contact: '+(506)8978675645',
});
copyObj1.contactData.push({
  type: 'fax',
  description: 'work',
  contact: '+(506)8778',
});
copyObj1.pendingTasks.pop();
copyObj1.department.offices[1] = '103 1st floor, finances reception 👈 here is the money 🤫';
copyObj1.department.name = 'Finances';

// Let's compare both objects
const edf = new EasyDiffMapper();
const diff = await edf.getDiffs(obj1, copyObj1, {
  excludeUnchanged: false,
});

console.log(JSON.stringify(diff, null, '  '));
```

_Result json_

```json
{
  "name": {
    "type": "Unchanged",
    "old": "Ed Edwards",
    "new": "Ed Edwards"
  },
  "address": {
    "type": "Updated",
    "old": "St 10, Av 10, Building 1023",
    "new": "St 10, Av 33, Building 1023"
  },
  "country": {
    "type": "Deleted",
    "old": "Costa Rica"
  },
  "contactData": {
    "0": {
      "type": {
        "type": "Unchanged",
        "old": "email",
        "new": "email"
      },
      "description": {
        "type": "Unchanged",
        "old": "personal",
        "new": "personal"
      },
      "contact": {
        "type": "Unchanged",
        "old": "eedwards@gmail.com",
        "new": "eedwards@gmail.com"
      }
    },
    "1": {
      "type": {
        "type": "Updated",
        "old": "email",
        "new": "phone"
      },
      "description": {
        "type": "Updated",
        "old": "work",
        "new": "personal"
      },
      "contact": {
        "type": "Updated",
        "old": "eedwards@coolcompany.com",
        "new": "+(506)8978675645"
      }
    }
  },
  "pendingTasks": {
    "0": {
      "type": "Unchanged",
      "old": "Prepare invoice payments",
      "new": "Prepare invoice payments"
    },
    "1": {
      "type": "Unchanged",
      "old": "Update excel payroll information",
      "new": "Update excel payroll information"
    },
    "2": {
      "type": "Deleted",
      "old": "Make a deposit for payroll"
    }
  },
  "department": {
    "name": {
      "type": "Updated",
      "old": "finances",
      "new": "Finances"
    },
    "offices": {
      "0": {
        "type": "Unchanged",
        "old": "408 4th floor, finances main office",
        "new": "408 4th floor, finances main office"
      },
      "1": {
        "type": "Updated",
        "old": "103 1st floor, finances reception",
        "new": "103 1st floor, finances reception 👈 here is the money 🤫"
      }
    }
  }
}
```

### Parameter options

| Parameter                | type    | description                            |
| ------------------------ | ------- | -------------------------------------- |
| originalObject           | any     | Object without changes                 |
| newObject                | any     | Updated object                         |
| options                  | Options |                                        |
| options.excludeUnchanged | boolean | True to exclude fields without changes |

## Methods

EasyDiffMapper used as a instanced class provide the following methods.

```typescript
const diff = new EasyDiffMapper();
await diff.getDiffs(obj1, obj2, options);
```

## Stay in touch

- Author - Luis Arias 2021 <<ariassd@gmail.com>>
  [GitHub profile](https://github.com/ariassd)

## License

This software is licensed under [MIT License](LICENSE)

![](assets/MIT.png) ![](assets/open-source.png)

November 2021
