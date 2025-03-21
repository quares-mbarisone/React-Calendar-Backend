const { response } = require('express');
const Evento = require('../models/Evento');

const getEventos = async ( req, res = response ) => {
    
    try {

        const eventos = await Evento.find().populate('user','name')
        
        res.json({
            ok: true,
            eventos,
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error!',
        })
    }

};

const crearEvento = async ( req, res = response ) => {

    try {

        const evento = new Evento(req.body);
        evento.user = req.uid;
        
        const eventoGuardado = await evento.save();
        
        res.json({
            ok: true,
            evento: eventoGuardado
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error!',
        })
    }
};

const actualizarEvento = async ( req, res = response ) => {
    
    try {
        
        const eventId = req.params.id;
        const uid = req.uid;
        
        const evento = await Evento.findById( eventId );
        if (!evento){
            return res.status(404).json({
                ok: false,
                msg: `No se encontraron eventos con id: ${eventId}`
            })
        }

        if( evento.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: `No tiene privilegio para editar este evento!!`
            })
        }
        
        const newEvent = {
            ...req.body,
            user: uid,

        }

        const updatedEvent = await Evento.findByIdAndUpdate( eventId, newEvent, { new: true } );
        
        res.json({
            ok: true,
            evento: updatedEvent
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error!',
        })
    }

};

const eliminarEvento = async ( req, res = response ) => {
    
    try {
        
        const eventId = req.params.id;
        const uid = req.uid;
        
        const evento = await Evento.findById( eventId );
        if (!evento){
            return res.status(404).json({
                ok: false,
                msg: `No se encontraron eventos con id: ${eventId}`
            })
        }

        if( evento.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: `No tiene privilegio para eliminar este evento!!`
            })
        }

        const deletedEvent = await Evento.findByIdAndDelete( eventId );
        
        res.json({
            ok: true,
            evento: deletedEvent
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error!',
        })
    }

};

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento,
}