/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, MapPin, Phone, Mail, Building, Globe, CheckCircle2 } from 'lucide-react';
import { getPageContent } from '../services/contentService';
import { submitContactInquiry } from '../api/adminClient';
import { usePageStore } from '../store/pageContentStore';
import FixedImage from './ui/FixedImage';

export default function ContactPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitState, setSubmitState] = useState({ loading: false, success: '', error: '' });
  const [formValues, setFormValues] = useState({});
  const defaultContact = usePageStore(state => state.content.contact);

  useEffect(() => {
    async function loadData() {
      const apiData = await getPageContent("contact");
      setData({ ...defaultContact, ...(apiData || {}) });
      setLoading(false);
    }
    loadData();
  }, [defaultContact]);

  if (loading) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center gap-4 text-slate-500">
        <Loader2 className="h-10 w-10 animate-spin text-[var(--site-primary)]" />
        <p className="font-semibold text-lg animate-pulse tracking-wide font-['Poppins']">Loading Contact Map...</p>
      </div>
    );
  }

  // EXACT STRUCTURE
  const header = data?.header || {};
  const formFieldsData = data?.formFields || {};
  const infoSide = data?.infoSide || {};
  
  const parsedFormFields = formFieldsData.fields ? formFieldsData.fields.split(',').map(f => f.trim()) : ['Name', 'Email', 'Message'];
  const cards = infoSide.blocks || [];
  const normalizeFieldKey = (field) => field.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');

  const handleFieldChange = (field, value) => {
    const key = normalizeFieldKey(field);
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = formValues.name || formValues.full_name || '';
    const email = formValues.email || '';
    const phone = formValues.phone || formValues.mobile || '';
    const subject = formValues.subject || formFieldsData.formTitle || 'Website Inquiry';
    const message = formValues.message || formValues.query || formValues.enquiry || '';

    setSubmitState({ loading: true, success: '', error: '' });
    try {
      await submitContactInquiry({ name, email, phone, subject, message });
      setSubmitState({
        loading: false,
        success: 'Your message has been submitted. It will now appear in the admin admissions panel.',
        error: '',
      });
      setFormValues({});
    } catch (error) {
      setSubmitState({
        loading: false,
        success: '',
        error: error.message || 'Failed to submit your message.',
      });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pb-24">
      {/* 1. Header Block */}
      <section className="relative w-full bg-[var(--site-primary)] overflow-hidden flex items-center justify-center min-h-[300px] mb-16 shadow-inner">
        {header?.backgroundImage ? (
           <FixedImage src={header.backgroundImage} ratio="28/9" className="opacity-30 mix-blend-overlay w-full" />
        ) : (
           <div className="w-full text-transparent" style={{ aspectRatio: '16/9' }}>.</div>
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 max-w-3xl mx-auto z-10 text-white">
          <h1 className="text-4xl md:text-6xl font-bold font-['Poppins'] mb-6 tracking-tight drop-shadow"  style={{color:'#fff'}}>{header?.heading} </h1>
          {header?.subheading && <p className="text-xl opacity-90 drop-shadow-sm font-medium">{header.subheading}</p>}
        </div>
      </section>

      {/* 2. Form + Info Side Block */}
      <section className="section-container">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left => Form */}
            <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(15,23,42,0.06)] p-8 md:p-12 border border-slate-100">
              <h2 className="text-3xl font-bold   mb-8 font-['Poppins']" style={{color:'#000'}}>
                {formFieldsData?.formTitle || "Send a Message"}
              </h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                {parsedFormFields?.length > 0 && parsedFormFields.map((field, idx) => (
                  <div key={idx}>
                    <label className="block text-sm font-medium   mb-2" style={{color:'#000'}} >{field}</label>
                    {field.toLowerCase().includes('message') || field.toLowerCase().includes('query') ? (
                       <textarea rows="4" value={formValues[normalizeFieldKey(field)] || ''} onChange={(e) => handleFieldChange(field, e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent transition text-dark-900 bg-gray-50/50" placeholder={`Enter your ${field.toLowerCase()}...`}></textarea>
                    ) : (
                       <input type={field.toLowerCase().includes('email') ? 'email' : 'text'} value={formValues[normalizeFieldKey(field)] || ''} onChange={(e) => handleFieldChange(field, e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent transition   bg-gray-50/50" placeholder={`Enter ${field.toLowerCase()}...`} style={{color:'#000'}} />
                    )}
                  </div>
                ))}
                {submitState.success && (
                  <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5" />
                    <p className="text-sm font-medium" >{submitState.success}</p>
                  </div>
                )}
                {submitState.error && (
                  <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                    {submitState.error}
                  </div>
                )}
                <button type="submit" disabled={submitState.loading} className="w-full py-4 mt-4 bg-[var(--site-primary)] text-white font-bold rounded-xl hover:bg-blue-900 transition shadow-md transform hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-70">
                  {submitState.loading ? 'Submitting...' : 'Submit Form'}
                </button>
              </form>
            </div>

            {/* Right => Info Side */}
            <div className="flex flex-col justify-center space-y-10">
               <div>
                 <h2 className="text-4xl font-bold  mb-4 font-['Poppins']" style={{color:'#000'}}>{infoSide?.heading || "Reach Out"}</h2>
                 {infoSide?.subheading && <h3 className="text-xl font-medium text-[var(--site-primary)] mb-4" style={{color:'#000'}}>{infoSide.subheading}</h3>}
                 {infoSide?.description && <p className="text-lg leading-relaxed whitespace-pre-wrap"  style={{color:'#65758b'}}>{infoSide.description}</p>}
               </div>

               {cards?.length > 0 && (
                 <div className="grid gap-6">
                   {cards.map((card, idx) => (
                     <div key={idx} className="bg-slate-50 p-6 pb-0 pb-3 rounded-2xl border border-slate-100 flex items-start space-x-5 hover:shadow-md transition">
                       <div className="w-12 h-12 bg-white shadow-sm rounded-full flex flex-shrink-0 items-center justify-center text-[var(--site-primary)]">
                          {card.icon?.toLowerCase().includes("phone") ? <Phone className="w-5 h-5" /> :
                           card.icon?.toLowerCase().includes("mail") ? <Mail className="w-5 h-5" /> :
                           card.icon?.toLowerCase().includes("map") ? <MapPin className="w-5 h-5" /> :
                           card.icon?.toLowerCase().includes("globe") ? <Globe className="w-5 h-5" /> :
                           <Building className="w-5 h-5" />}
                       </div>
                       <div>
                         <h4 className="text-lg font-bold  " style={{color:'#000'}}>{card.title}</h4>
                         <p className="  mt-1 whitespace-pre-wrap" style={{color:'#65758b'}}>{card.text}</p>
                       </div>
                     </div>
                   ))}
                 </div>
               )}
            </div>

         </div>
      </section>

      {/* 3. Map Section */}
      {infoSide?.mapEmbedUrl && (
        <section className="max-w-7xl mx-auto mt-4 mb-20 px-4 xl:px-0">
          <div className="w-full h-[400px] md:h-[500px] rounded-[32px] overflow-hidden shadow-[0_10px_40px_rgba(15,23,42,0.08)] border border-slate-100 bg-slate-50 relative">
            <iframe
              src={infoSide.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="School Location Map"
              className="w-full h-full absolute inset-0"
            ></iframe>
          </div>
        </section>
      )}

    </motion.div>
  );
}
