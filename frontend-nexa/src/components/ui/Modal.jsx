import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

/**
 * Basic modal component using Headless UI.
 * Renders children inside a centered card with backdrop.
 *
 * Props:
 * - isOpen: boolean controlling visibility
 * - onClose: function called when modal should close
 * - title: optional string displayed at top of modal
 */
export default function Modal({ isOpen, onClose, title, children }) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transition-all transform duration-200"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition-all transform duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="bg-nexa-card border border-nexa-border rounded-xl p-6 w-full max-w-md shadow-xl">
            {title && <Dialog.Title className="font-display text-xl text-white mb-4">{title}</Dialog.Title>}
            {children}
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}