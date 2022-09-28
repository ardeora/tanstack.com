import { useState, Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'

import { HiCheck, HiChevronDown } from 'react-icons/hi'

import vueLogo from '../images/vue-logo.svg'
import reactLogo from '../images/react-logo.svg'
import solidLogo from '../images/solid-logo.svg'

const frameworks = [
  { name: 'React', value: 'react' },
  { name: 'Solid', value: 'solid' },
  { name: 'Vue', value: 'vue' },
]

const logoMap = {
  react: reactLogo,
  solid: solidLogo,
  vue: vueLogo,
}

export function FrameworkSelect() {
  const [selected, setSelected] = useState(frameworks[0])

  return (
    <div className="top-16 w-full px-4">
      <div className="text-[.9em] uppercase font-black">Framework</div>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full hover:bg-gray-100/70 dark:hover:bg-gray-800 cursor-default border-2 dark:border-gray-700/80 rounded-md py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">

            <img
              height={18}
              width={18}
              className="inline-block mr-2"
              src={logoMap[selected.value as keyof typeof logoMap]}
              alt={`${selected.name} logo`}
            />    
            <span className="truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <HiChevronDown 
                className="h-5 w-5 text-gray-400"
                aria-hidden="true" 
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {frameworks.map((framework, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-4 pr-10 ${
                      active ? 'bg-gray-100' : 'text-gray-900'
                    }`
                  }
                  value={framework}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {framework.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-800">
                          <HiCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

