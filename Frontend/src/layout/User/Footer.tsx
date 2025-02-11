
import { MapPin, Phone, Clock, Facebook, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Vastway</h3>
            <p className="text-gray-300 text-sm">
              Trusted Regulated Canadian Immigration Consultant. Helping people from around the globe with their education, immigration, and citizenship applications.
            </p>
            <p className="text-gray-300 text-sm">RCIC – R706534</p>
          </div>

        
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <p className="text-sm text-gray-300">7900, Hurontario St #203, Brampton, ON L6Y 0P6, Canada. +1 (647) 982-0999</p>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <p className="text-sm text-gray-300">5th floor, 508, Shivalik square Near GSRTC bus stop, Ranip Ahmedabad – 380027</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <p className="text-sm text-gray-300">63563 51119</p>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <p className="text-sm text-gray-300">Consulting Hours: Mon to Fri - 9 AM to 6 PM</p>
              </div>
            </div>
          </div>

          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Services</h3>
            <ul className="space-y-2">
              {['Work In Canada', 'Study in Canada', 'Sponsor family member', 'Express Entry'].map((service) => (
                <li key={service}>
                  <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        
          
        </div>

   
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-300">
            Copyright © 2021 Vastway Immigration Services.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;